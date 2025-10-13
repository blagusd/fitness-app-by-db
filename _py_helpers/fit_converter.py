""" Convert .fit files to .csv files.
    Important: Requires garmin-fit-sdk package.
        Install via pip: pip install garmin-fit-sdk
        For more info visit: https://developer.garmin.com/fit/example-projects/python/
"""

import csv
import garmin_fit_sdk
import os


class FITConverter:

    def __init__(self):
        self.fit_files_path = '_data/fit-files'

    def convert_to_csv(self):
        for fit_file in os.listdir(self.fit_files_path):
            self.process_fit_file(os.path.join(self.fit_files_path, fit_file))
    
    def process_fit_file(self, file_path):
        stream = garmin_fit_sdk.Stream.from_file(file_path)
        decoder = garmin_fit_sdk.Decoder(stream)
        messages, errors = decoder.read() # read method automatically check is the file fit or not

        if len(errors) > 0:
            print(f"Something went wrong decoding the file: {errors}")
            return
        if len(messages) > 0:
            self.save_to_csv(file_path, messages)
        else:
            print(f"🚩 File {file_path} is not a valid FIT file or is corrupted.")

    def save_to_csv(self, file_path, messages):
        workout = messages['sport_mesgs'][0]['name'] \
                if 'sport_mesgs' in messages and messages['sport_mesgs'] else 'unknown'
        records = []
        fieldnames = []

        if workout == 'Strength':
            records = messages.get("set_mesgs", [])
        else:
            records = messages.get("record_mesgs", [])

        if not records:
            print(f"⚠️ No records found in {file_path}")
            return
            
        # Get all unique field names
        fieldnames = sorted({str(key) for record in records for key in record.keys()})

        # Write to CSV
        try:
            csv_file_path = file_path.replace('.fit', f'-{workout}.csv')\
                .replace('fit-files', 'csv-files')
            with open(csv_file_path, mode='w', newline='') as csv_file:
                writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
                writer.writeheader()
                for record in records:
                    # Convert all keys to strings
                    str_record = {str(k): v for k, v in record.items()}
                    writer.writerow(str_record)

            print(f"✅ Converted {file_path} → {csv_file_path}")

        except Exception as e:
            print(f"❌ Failed to write CSV for {file_path}: {e}")

if __name__ == "__main__":
    fit_converter = FITConverter()
    fit_converter.convert_to_csv()
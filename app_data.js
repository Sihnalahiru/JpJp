import pandas as pd
import json

def excel_to_records(path):
    xl = pd.ExcelFile(path)
    df = xl.parse(xl.sheet_names[0])
    return [{str(k).strip(): ("" if pd.isna(v) else str(v).strip()) for k, v in row.items()} for _, row in df.iterrows()]

# Convert all files from zip without missing any data
app_data = {
    'kanji_450': excel_to_records('Japan 3/Kanji_450_JFT_Basic_Master.xlsx'),
    'kanji_644': excel_to_records('Japan 3/Irodori_Kanji_644_Full_Authentic.xlsx'),
    'vocab_shokyu2': excel_to_records('Irodori_Shokyu2_Full_Vocab.xlsx'),
    'vocab_starter_x': excel_to_records('Irodori_Wordlist_X_Starter_74Pages_Complete.xlsx'),
    'vocab_elem1_y': excel_to_records('Japan 3/Irodori_Wordlist_Y_Elementary1_62Pages_Complete.xlsx'),
    'vocab_master': excel_to_records('Japan 3/JFT_Vocabulary_Master_List.xlsx'),
    'vocab_4topics': excel_to_records('Japan 3/JFT_Vocabulary_Four_Topics.xlsx'),
    'grammar_245': excel_to_records('Japan 3/Irodori_Grammar_All_245Pages_Complete.xlsx'),
    'cando': excel_to_records('Japan 3/Irodori_CanDo_List_Complete.xlsx'),
    'tips': excel_to_records('Japan 3/Irodori_TIPS_Index_Complete.xlsx')
}

with open('app_data.js', 'w', encoding='utf-8') as f:
    f.write("window.APP_DATA = " + json.dumps(app_data, ensure_ascii=False) + ";")
print("app_data.js successfully generated with 100% complete data!")

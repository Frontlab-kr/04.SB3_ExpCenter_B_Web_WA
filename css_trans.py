# https://jigsaw.w3.org/css-validator/

import re
import glob
import os

def find_latest_css_file():
    files = glob.glob('dist/assets/index-*.css')
    if not files:
        raise FileNotFoundError("No index-*.css files found in dist/assets/")
    # 파일 중 가장 최근 수정된 파일 선택 (선택적으로 해시 기준으로도 가능)
    latest_file = max(files, key=os.path.getmtime)
    print(f"✅ 최신 CSS 파일 선택됨: {latest_file}")
    return latest_file


def format_classes(file_path):
    # 파일 읽기
    with open(file_path, 'r', encoding='utf-8') as file:
        css_content = file.read()

    # 클래스별로 한 줄로 변환
    formatted_css = re.sub(r'\s*{\s*', ' { ', css_content)
    formatted_css = re.sub(r';\s*', '; ', formatted_css)
    formatted_css = re.sub(r'\s*}\s*', ' }\n', formatted_css)

    # 파일에 업데이트된 CSS 작성
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(formatted_css)

    print("클래스가 한 줄로 변환되었습니다.")

def remove_classes_with_auto_important(file_path):
    # 파일 읽기
    with open(file_path, 'r', encoding='utf-8') as file:
        css_content = file.read()

    # auto!important 속성을 포함하는 클래스 정규식 패턴
    pattern = r'\.[^{]+\{[^}]*auto\s*!important[^}]*\}\s*'

    # 패턴에 매칭되는 클래스 제거
    updated_css = re.sub(pattern, '', css_content)

    # 파일에 업데이트된 CSS 작성
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(updated_css)

    print("auto!important 속성을 포함한 클래스가 제거되었습니다.")


def remove_classes_with_v_slide_group(file_path):
    # 파일 읽기
    with open(file_path, 'r', encoding='utf-8') as file:
        css_content = file.read()

    # .v-slide-group__container가 포함된 클래스 정규식 패턴
    pattern = r'\.[^{]*v-slide-group__container[^}]*\{[^}]*\}\s*'

    # 패턴에 매칭되는 클래스 제거
    updated_css = re.sub(pattern, '', css_content)

    # 파일에 업데이트된 CSS 작성
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(updated_css)

    print(".v-slide-group__container가 포함된 클래스가 제거되었습니다.")

def remove_invalid_padding_top(file_path):
    # 파일 읽기
    with open(file_path, 'r', encoding='utf-8') as file:
        css_content = file.read()

    # padding-top: -30px; 포함된 스타일 블록을 찾고 삭제하는 정규식 패턴
    # pattern = r'padding-top\s*:\s*-30px\s*!important\s*;?'
    pattern = r'(padding-top\s*:\s*)-30px(\s*!important)'

    # 패턴에 매칭되는 블록 제거
    updated_css = re.sub(pattern, r'\g<1>0px\2', css_content, flags=re.DOTALL)

    # 파일에 업데이트된 CSS 작성
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(updated_css)

    print("padding-top: -30px;이 포함된 스타일 블록을 수정되었습니다.") 

def remove_supports_not_focus_visible(file_path):
    # 파일 읽기
    with open(file_path, 'r', encoding='utf-8') as file:
        css_content = file.read()

    # @supports not selector(:focus-visible) {...} 블록 정규식 패턴
    pattern = r'@supports\s+not\s+selector\(:focus-visible\)\s*\{[^}]*\}\s*'

    # 패턴에 매칭되는 블록 제거
    updated_css = re.sub(pattern, '', css_content, flags=re.DOTALL)

    # 파일에 업데이트된 CSS 작성
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(updated_css)

    print("@supports not selector(:focus-visible) {...} 블록이 제거되었습니다.")    

def remove_supports_focus_visible(file_path):
    # 파일 읽기
    with open(file_path, 'r', encoding='utf-8') as file:
        css_content = file.read()

    # @supports selector(:focus-visible) {...} 블록 정규식 패턴
    pattern = r'@supports\s+selector\(:focus-visible\)\s*\{[^}]*\}\s*'

    # 패턴에 매칭되는 블록 제거
    updated_css = re.sub(pattern, '', css_content, flags=re.DOTALL)

    # 파일에 업데이트된 CSS 작성
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(updated_css)

    print("@supports selector(:focus-visible) {...} 블록이 제거되었습니다.")
    

def remove_overline_classes(file_path):
    # 파일 읽기
    with open(file_path, 'r', encoding='utf-8') as file:
        css_content = file.read()

    # 특정 클래스가 포함된 CSS 블록 정규식 패턴
    pattern = r'\.(text-sm-overline|text-md-overline|text-lg-overline|text-xl-overline|text-xxl-overline)[^{]*\{[^}]*\}\s*'

    # 패턴에 매칭되는 블록 제거
    updated_css = re.sub(pattern, '', css_content, flags=re.DOTALL)

    # 파일에 업데이트된 CSS 작성
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(updated_css)

    print("`.text-sm-overline`, `.text-md-overline`, `.text-lg-overline`, `.text-xl-overline`, `.text-xxl-overline` 클래스가 제거되었습니다.")


def remove_closing_brace_only_lines(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    cleaned_lines = []
    for line in lines:
        stripped = line.strip()
        if stripped == '}' and line.startswith('}'):
            # 줄 전체가 '}'이고, 앞에 공백 없이 시작하면 제거
            continue
        cleaned_lines.append(line)

    with open(file_path, 'w', encoding='utf-8') as file:
        file.writelines(cleaned_lines)

    print("공백 없이 시작하는 '}'만 있는 줄이 제거되었습니다.")
    

def remove_any_closing_brace_after_focus_visible_after(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    result = []
    i = 0
    while i < len(lines):
        current_line = lines[i]
        if ':focus-visible:after' in current_line:
            result.append(current_line)
            # 다음 줄 검사
            if i + 1 < len(lines):
                next_line = lines[i + 1]
                if next_line.strip() == '}':  # 공백 포함 여부와 상관없이 '}'만 있으면 제거
                    i += 2
                    continue
        else:
            result.append(current_line)
        i += 1

    with open(file_path, 'w', encoding='utf-8') as file:
        file.writelines(result)

    print(":focus-visible:after 다음 줄의 '}'만 있는 줄이 제거되었습니다.")

# 사용 예제
# css_file_path = 'index-C0OvRix4.css'  #본부 CSS 파일 경로
# css_file_path = 'index-C2S44apf.css'  #보라매 CSS 파일 경로
# css_file_path = 'index-Bq2Bhy4r.css'

# dist/assets/index-hash.css 파일 자동 탐지
css_file_path = find_latest_css_file()

# 1단계: 클래스 한 줄로 변환
format_classes(css_file_path)

# 2단계: auto!important 속성을 포함한 클래스 제거
remove_classes_with_auto_important(css_file_path)
remove_supports_not_focus_visible(css_file_path)
remove_supports_focus_visible(css_file_path)
remove_classes_with_v_slide_group(css_file_path)
remove_invalid_padding_top(css_file_path)
remove_closing_brace_only_lines(css_file_path)
remove_overline_classes(css_file_path)
remove_any_closing_brace_after_focus_visible_after(css_file_path)



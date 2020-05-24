import os
from csv import reader
# import pandas as pd
import warnings


def pipeline(image_name):
    """

    Args:
        image_name:

    Returns:

    """


    image_path = "/app/img/{file_name}".format(file_name=image_name)
    result_csv_path = "/app/result/{file_name}/".format(file_name=image_name)

    command = "/home/openface-build/build/bin/FaceLandmarkImg -f {image_path} -out_dir {result_csv_path}".format(
            image_path=image_path,
            result_csv_path=os.path.join(result_csv_path)
    )

    # Alias
    # tmp = "alias FaceLandmarkImg='/home/openface-build/build/bin/FaceLandmarkImg'"


    # execute command
    os.system(command)
    print(os.path.join(result_csv_path, image_name[:image_name.rfind(".")] + ".csv"))
    try:
        with open(os.path.join(result_csv_path, image_name[:image_name.rfind(".")] + ".csv"), "r") as p_file:
            row_data = []
            csv_reader = reader(p_file, delimiter=',')
            for row in csv_reader:
                print(len(row))
                row_data.append(row)
    except:
        return -1, -1, -1

    # print(row_data)

    useful_col = [" AU45_c", " eye_lmk_x_11", " eye_lmk_y_11", " eye_lmk_x_17", " eye_lmk_y_17", " eye_lmk_x_39",
                  " eye_lmk_y_39", " eye_lmk_x_45", " eye_lmk_y_45"]
    col_idx = {}
    data = {}
    for idx, cel in enumerate(row_data[0], 0):
        if cel in useful_col:
            cel = cel[1:]   # delete useless space
            col_idx[cel] = idx
            data[cel] = float(row_data[1][idx][1:])  # delete useless space

    print(useful_col)
    print(col_idx)
    print(data)

    eyes_left_distance = get_distance_eyes(data["eye_lmk_x_11"], data["eye_lmk_y_11"],
                                           data["eye_lmk_x_17"], data["eye_lmk_y_17"])

    eyes_right_distance = get_distance_eyes(data["eye_lmk_x_39"], data["eye_lmk_y_39"],
                                            data["eye_lmk_x_45"], data["eye_lmk_y_45"])

    return eyes_left_distance, eyes_right_distance, data["AU45_c"]




def get_distance_eyes(hx, hy, bx, by):
    if abs(hx - bx) > 5:
        warnings.warn("x pos eye distance is high")
    return abs(hy - by)




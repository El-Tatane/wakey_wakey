# from WakeyServer import serve
from pipeline_ia import pipeline
import os


def is_closed(integer, threshold):
    if integer <= threshold:
        return 1
    else:
        return 0

if __name__ == "__main__":
    # serve()

    # 0 = open, 1 = close
    dict_true = {"o": 0, "f": 1, 'k': -1}

    good = {"gauche": 0, "droite": 0, "au_45_c": 0}
    bad = {"gauche": 0, "droite": 0, "au_45_c": 0}

    threshold = 5

    files = os.listdir("/app/img/")
    for file in files:
        list_res = []
        list_res.extend([*pipeline(file)])    # gauche, droite, au_45_c

        true_res = file[0]

        for value, res_type in zip(list_res, good.keys()):
            if value == dict_true[true_res]:
                good[res_type] += 1
            else:
                bad[res_type] += 1

    print("good", good)
    print("bad", bad)



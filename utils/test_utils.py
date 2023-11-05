import os


def load_texts(data_dir, depth) -> [str]:
    id:[str] = []
    sentences:[str] = []
    for filename in os.listdir(data_dir):
        path = os.path.join(data_dir, filename)
        if not (os.path.isfile(path)):
            continue
        id.append(filename)
        file = open(path, 'r')
        sentences.append(file.read(depth))
        file.close()

    return id, sentences

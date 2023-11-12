def get_dataset_name(path: str) -> str:
    segments = path.split('/')
    return segments[len(segments)-2]

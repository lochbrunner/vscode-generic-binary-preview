#!/usr/bin/env python

import argparse
import pickle


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--name', default='Bigamiluschwatvokovitschwilli')
    parser.add_argument('filename')
    args = parser.parse_args()

    obj = {'name': args.name}
    with open(args.filename, 'wb') as f:
        pickle.dump(obj, f)

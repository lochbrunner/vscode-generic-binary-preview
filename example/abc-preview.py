#!/usr/bin/env python

import argparse
import os
import sys
import pickle

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('filename')
    args = parser.parse_args()

    if os.path.splitext(args.filename)[1] != '.abc':
        # We can not read this file type
        sys.exit(1)

    with open(args.filename, 'rb') as f:
        obj = pickle.load(f)
        name = obj['name']

        print("<p>Your name is {}</p>".format(name))

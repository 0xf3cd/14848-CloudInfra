#! /usr/bin/python

import sys

def parse_line(line):
  day = int(line[15:23])
  temp = int(line[87:92])
  quality = int(line[92])
  return (day, temp, quality)

def validate(temp, quality):
  if abs(temp) == 9999:
    return False
  if quality not in [0, 1, 4, 5, 9]:
    return False
  return True

for line in sys.stdin:
  line = line.strip()
  day, temp, quality = parse_line(line)

  # Skip the invalid line(s).
  if not validate(temp, quality):
    continue

  print(str(day) + ' ' + str(temp))

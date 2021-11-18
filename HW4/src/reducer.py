#! /usr/bin/python

import sys

cur_day = None
cur_max_temp = -9999

for line in sys.stdin:
  # Parse and validate the intpu line.
  line = line.strip()
  day, temp = line.split(' ')
  try:
    day = int(day)
    temp = int(temp)
  except ValueError:
    continue

  # Check if we need to update the metadata.
  if day != cur_day:
    if cur_day:
      print(str(cur_day) + '\t' + str(cur_max_temp))
    cur_day = day
    cur_max_temp = -9999

  if cur_max_temp < temp:
    cur_max_temp = temp

if cur_day:
  print(str(cur_day) + '\t' + str(cur_max_temp))

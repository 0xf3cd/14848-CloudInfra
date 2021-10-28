import os

def read_env_var(key):
  return os.environ.get(key)

def print_usage():
  print('Welcome tot Big Data Processing Application')
  print('Please enter the number of the application that you would like to use:')
  print('1. Apache Hadoop')
  print('2. Apache Spark')
  print('3. Jupyter Notebook')
  print('4. SonarQube amd SonarScanner')
  print("Type 'q' to quit")
  print()

def get_user_input():
  choice = input('Your choice: ')
  choice = choice.strip().lower()
  return choice

def validate_input(choice):
  if len(choice) != 1:
    return False
  if choice == 'q':
    return True
  if choice >= '1' and choice <= '4':
    return True
  return False

def serve(choice):
  print(f'Application {choice}\n')
  # TODO(ningqiw): Implement this!

def main():
  while True:
    print_usage()
    choice = get_user_input()
    if not validate_input(choice): # Validation
      print('Invalid input.\n')
      continue
    if choice == 'q': # Quit
      print('Bye.\n')
      break
    choice = int(choice)
    serve(choice)
    
if __name__ == '__main__':
  main()
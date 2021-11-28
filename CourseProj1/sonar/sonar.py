import logging
import time
import os
import paramiko
from websocket_server import WebsocketServer

BUF_SIZE    = 4096
SSH_USER    = os.environ.get('PARAMIKO_USER')
SSH_PSWD    = os.environ.get('PARAMIKO_PASSWORD')
PORT        = int(os.environ.get('PARAMIKO_WS_PORT'))

client_channels = dict() # Key: client's id, Value: the ssh channel object

def new_client(client, server):
  # Create the ssh session.
  ssh = paramiko.SSHClient()
  ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
  ssh.connect('127.0.0.1', 22, SSH_USER, SSH_PSWD)
  # Create the channel to the ssh session, and put it in `client_channels`.
  channel = ssh.invoke_shell()
  channel.settimeout(1200)
  client_channels[client['id']] = channel
  # Sleep for 1 second and wait for the channel to be initialized.
  time.sleep(1)
  # Retrive the greeting info from the ssh session.
  login_info = channel.recv(BUF_SIZE)
  server.send_message(client, login_info)

def handle_msg(client, server, msg):
  # Get the channel by client's id.
  channel = client_channels[client['id']]
  # Execute the command. 
  # TODO: User command is not validated here (leaving space for attacks).
  channel.send(msg + '\n')
  # Read the response from the channel.
  res = ''
  while True:
    buf = channel.recv(BUF_SIZE)
    buf = buf.decode('utf-8')
    res += buf
    if ':~#' in res:
      break
  # Remove the first line (which is the user's commands).
  res = res.split('\n')[1:]
  res = '\n'.join(res)
  server.send_message(client, res)

os.system('/etc/init.d/sshd start')

server = WebsocketServer(host='0.0.0.0', port=PORT, loglevel=logging.INFO)
server.set_fn_new_client(new_client)
server.set_fn_message_received(handle_msg)
server.run_forever()

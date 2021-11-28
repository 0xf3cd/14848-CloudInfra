const ENV = process.env;

const BASE_URL                = ENV['BASE_URL'] || 'http://localhost';
const JUPYTER_URL             = ENV['JUPYTER_URL'] || 'ws://localhost:3001';
const HADOOP_TERMINAL_WS_URL  = ENV['HADOOP_TERMINAL_WS_URL'] || 'ws://localhost:3001';
const SPARK_TERMINAL_WS_URL   = ENV['SPARK_TERMINAL_WS_URL'] || 'ws://localhost:3001';
const SONAR_TERMINAL_WS_URL   = ENV['SONAR_TERMINAL_WS_URL'] || 'ws://localhost:3001';

export {
  BASE_URL,
  JUPYTER_URL,
  HADOOP_TERMINAL_WS_URL,
  SPARK_TERMINAL_WS_URL,
  SONAR_TERMINAL_WS_URL,
};

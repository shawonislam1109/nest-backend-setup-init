export type Connection = {
  CONNECTION_STRING: string;
  DB: string;
  DBNAME: string;
};

export const connection: Connection = {
  CONNECTION_STRING: 'https://mongobd:192892/nest_learn',
  DB: 'MONGO DB',
  DBNAME: 'NEST MODULE',
};

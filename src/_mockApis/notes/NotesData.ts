import mock from '../mock';

const NotesData = [
  {
    id: 1,
    color: 'info',
    title:
      'Lo',
    datef: '2023-06-03T23:28:56.782Z',
    deleted: false,
  },
  {
    id: 2,
    color: 'error',
    title:
      'Se,',
    datef: '2023-06-02T23:28:56.782Z',
    deleted: false,
  },
  {
    id: 3,
    color: 'warning',
    title:
      'atur?',
    datef: '2023-06-01T23:28:56.782Z',
    deleted: false,
  },
  {
    id: 4,
    color: 'success',
    title:
      'um.',
    datef: '2023-06-03T23:28:56.782Z',
    deleted: false,
  },
];
mock.onGet('/api/data/notes/NotesData').reply(() => {
  return [200, NotesData];
});
export default NotesData;

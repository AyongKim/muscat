import mock from '../mock';
import { sub } from 'date-fns';
import { Chance } from 'chance';

const chance = new Chance();

const CompanyData = [
  {
    title: '머스캣',
    num: 275, 
    id: 1, 
  },
  {
    title: '네오킴',
    num: 276, 
    id: 2, 
  },
  {
    title: '디스트로네',
    num: 277, 
    id: 3, 
  },
 
];

mock.onGet('/api/data/eCommerce/CompanyData').reply(() => {
  return [200, CompanyData];
});

export default CompanyData;

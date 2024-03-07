import mock from './mock';  
import './notes/NotesData';
import './ticket/TicketData';
import './eCommerce/ProductsData'; 

mock.onAny().passThrough();

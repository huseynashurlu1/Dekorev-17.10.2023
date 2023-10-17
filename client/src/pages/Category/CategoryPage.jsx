import { useParams } from 'react-router-dom';
import './category.css';
import { useEffect, useState } from 'react';
import axios from 'axios'
import apiUrl from '../../utils/api'
import ProductItem from '../../components/Product/ProductItem'
import AlertBox from '../../components/AlertBox'

const CategoryPage = () => {
  const { id } = useParams()
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1); 
  const [items, setItems] = useState([])
  const [colors, setColors] = useState([])
  const [selectedSort, setSelectedSort] = useState("0");

  

  useEffect(() => {
    const getItemsByCategory = async () => {
        try {
            const response = await axios.get(`${apiUrl.productApi.productURL}/all/${id}?page=${currentPage}&perPage=${itemsPerPage}&sort=${selectedSort}`);
            setItems(response.data.products);
            setColors([...new Set(response.data.products.map((product) => product.colorId.name))])
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.log(error);
        }
    }

    getItemsByCategory(currentPage, itemsPerPage);
}, [currentPage, itemsPerPage, selectedSort]);


const renderPagination = () => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className='d-flex justify-content-center'>
            <ul className="pagination mt-5">
            {pageNumbers.map((number) => (
                <li key={number} className={`mx-2 page-item ${currentPage === number ? 'active' : ''}`}>
                    <button onClick={() => handlePageChange(number)}>
                        {number}
                    </button>
                </li>
            ))}
        </ul>
        </div>
    );
};

const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
};


const handleSortChange = (event) => {
    const newSortValue = event.target.value;
    setSelectedSort(newSortValue);
    setCurrentPage(1); 
};

if(items.length === 0) {
    return <AlertBox text='Bu kateqoriyaya uyğun məhsul yoxdur'/>
}

  return (
    <div id="Shop-wide">
    <div className="container">
        <div className="sw-top">
            <div className="row align-items-center">
                <div className="col-lg-6 col-6">
                    <h1><span>({items.length} məhsul)</span></h1>
                </div>
                <div className="col-lg-6 col-6 d-flex align-items-center justify-content-end">
                <select onChange={handleSortChange}  value={selectedSort}>
                    <option value="0">Sırala</option>
                    <option value="1">A-Z</option>
                    <option value="2">Z-A</option>
                    <option value="3">Ucuzdan bahaya</option>
                    <option value="4">Bahadan ucuza</option>
                </select>
                    <button className="btn_filter"> Filtrlə</button>
                </div>
            </div>
        </div>
        <div className="sw-filter">
            <div className="left">
                <div className="filter-box">
                    <div className="price-filter">
                        <p>Qiymət (AZN)</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <input id="numb" type="number" value="0" />
                            <span>-</span>
                            <input id="numb" type="number" value="999" />
                        </div>
                    </div>

                    <div className="color-filter">
                        <p>Rəng</p>
                        <div className="color-list">
                            {
                                colors.map(item => {
                                   return(
                                     <label key={item}>
                                        <input
                                            type="checkbox"
                                            name={item}
                                        />
                                        {item}
                                    </label>
                                   )
                                })
                            }
                        </div>
                    </div>

                        <button className='btn'>Filterlə</button>
                </div>
            </div>
            <div className="right">
                <div className="vip-boxes">
                   <div className="row gy-4">
                    {
                        items && items.map(item => {
                            return(
                                <ProductItem key={item._id} data={item}/>
                            )
                        })
                    }
                   </div>
                </div>
                {renderPagination()}
            </div>
        </div>
        
    </div>
</div>
 
  )
}
export default CategoryPage

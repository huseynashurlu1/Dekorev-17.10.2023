import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import apiUrl from '../../../utils/api';



const CreateItem = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');
  const [item, setItem] = useState({
    name: '',
    description: '',
    price: '',
    image: null, // Change to null
    shipping: false,
    categoryId: '',
    subCategoryId: '',
    brandId: '',
  });

  useEffect(() => {
    async function getCategories() {
      const response = await axios.get(apiUrl.categoryApi.getCategories);
      setCategories(response.data.categories);
      setSubCategories(response.data.sub_categories);
    }

    async function getBrands() {
      const response = await axios.get(apiUrl.brandApi.getBrands);
      setBrands(response.data);
    }

    getCategories();
    getBrands();
  }, []);


  const filtered = subCategories.filter(x => x.categoryId == selectedOption)

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setItem({ ...item, image: imageFile });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(item);
    try {
      const formData = new FormData();
      formData.append('image', item.image); // Use the image file directly
      formData.append('name', item.name);
      formData.append('price', item.price);
      formData.append('description', item.description);
      formData.append('categoryId', item.categoryId);
      formData.append('subCategoryId', item.subCategoryId);
      formData.append('brandId', item.brandId);
      formData.append('shipping', item.shipping);

      console.log(formData);

      await axios.post(apiUrl.productApi.addProduct, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
      });

      alert('Məhsul əlavə edildi');
    } catch (error) {
      console.error('Xəta:', error);
    }
  };
  return (
    <div className="container">
        <h3 style={{fontFamily: "Regular", padding: "20px 0"}}>Yeni məhsul</h3>
        <div className='col-lg-6 mx-auto'>
        <Form onSubmit={handleSubmit} encType="multipart/form-data" >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Məhsulun adı</Form.Label>
                <Form.Control type="text" onChange={(e) => setItem({ ...item, name: e.target.value })} defaultValue={item.name}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Qiyməti</Form.Label>
                <Form.Control type="number" onChange={(e) => setItem({ ...item, price: e.target.value })} defaultValue={item.price}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Təsviri</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={(e) => setItem({ ...item, description: e.target.value })} defaultValue={item.description}/>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Şəkli</Form.Label>
                <Form.Control onChange={handleImageChange} type="file" />
            </Form.Group>
            <Form.Select value={item.categoryId} name="categoryID" className='mb-4' aria-label="Default select example" onChange={(e) => {
              setItem({ ...item, categoryId: e.target.value })
              setSelectedOption(e.target.value)
              setDisabled(false)
            }}>
                <option>Kateqoriya</option>
                {
                    categories && categories.map(item => {
                        return(
                           <option key={item._id} value={item._id}>{item.name}</option>
                        )
                    })
                }
                </Form.Select>
               <Form.Select disabled={disabled} name="subCategoryId" className='mb-4' aria-label="Default select example" onChange={(e) => setItem({ ...item, subCategoryId: e.target.value })} value={item.subCategoryId}>
                <option>Alt Kateqoriya</option>
                {
                  filtered.length > 0 && filtered.map(item => {
                    return(
                      <option key={item._id} value={item._id}>{item.name}</option>
                    )
                  })
                }
                </Form.Select>
            <Form.Select onChange={(e) => setItem({ ...item, brandId: e.target.value })} value={item.brandId} name="categoryID" className='mb-4' aria-label="Default select example">
                <option>Brend</option>
                {
                    brands && brands.map(item => {
                        return(
                           <option key={item._id} value={item._id}>{item.name}</option>
                        )
                    })
                }
                </Form.Select>
                <Form.Check
                    inline
                    label="Çatdırılma"
                    name="shipping"
                    type="checkbox"
                    id=""
                    checked={item.shipping}
                    onChange={(e) => setItem({ ...item, shipping: e.target.checked })}
                    />
                                
             <button type='submit' className='btn btn-success w-100 mt-4'>Əlavə et</button>
            
        </Form>
    </div>
    </div>
  )
}

export default CreateItem

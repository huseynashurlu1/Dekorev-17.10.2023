import React from 'react'

const CategoryEdit = () => {
    const [item, setItem] = useState({
        name: '',
        image: null
    })

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setItem({ ...item, image: imageFile });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const formData = new FormData();
          formData.append('name', item.name);
          formData.append('image', item.image);
          
          await axios.post(`${apiUrl.categoryApi.categoryURL}/add`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          alert('Kateqoriya əlavə edildi');
        } catch (error) {
          console.error('Xəta:', error);
        }
      };
    
  return (
    <div className="container">
    <h3 style={{fontFamily: "Regular", padding: "20px 0"}}>Yeni kateqoriya</h3>
    <div className='col-lg-6 mx-auto'>
    <div className="add-box">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Kateqoriya adı</Form.Label>
            <Form.Control onChange={(e) => setItem({ ...item, name: e.target.value })} type="text"/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Kateqoriya şəkli</Form.Label>
            <Form.Control  onChange={handleImageChange} type="file"/>
        </Form.Group>
         <button onClick={handleSubmit} className='btn btn-success w-100 mt-4'>Əlavə et</button>
    </div>
      
  </div>
  <ToastContainer />
  </div>
  )
}

export default CategoryEdit
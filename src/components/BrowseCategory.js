import React, {useState} from 'react'; 
import {Grid} from '@material-ui/core'; 
import {Link} from 'react-router-dom';
import Card from './Card';


const BrowseCategory = (props) => {
    const {stores, categories} = props; 
    
    const [selectedCategory, setSelectedCategory] = useState(); 


    const displayCategories = () => {
        return categories.map(category => {
            return <li><a className = "categoryLink" onClick = {() => {setSelectedCategory(category.name)}}>{category.name}</a></li> 
        })
    }


    const displayStoresAccToCategories = () => {
        return stores.map(store => {
            let profileLink = `/profile/${store.email}` 
            if (selectedCategory){
                return store.category.map((category) => {
                    if (category === selectedCategory){
                        return <Grid item xs = {4} key = {store.name} style = {{marginBottom: '3%'}}>
                        <Link className = "store-profile-link" to = {profileLink}><Card title = {store.name} subheader = {store.address} description = {store.category.join(', ')} distance = {store.distance_from_user} image = {store.image} menu = {[store.email, store.phone]}/></Link>
                    </Grid>                    }
                })
            }
            else{
                return <Grid item xs = {4} key = {store.name} style = {{marginBottom: '3%'}}>
                <Link className = "store-profile-link" to = {profileLink}><Card title = {store.name} subheader = {store.address} description = {store.category.join(', ')} distance = {store.distance_from_user} image = {store.image} menu = {[store.email, store.phone]}/></Link>
            </Grid>
            }
           
        })

    }

    return (
        <div>
            <div className = "explore-message">
                <h1>Browse By Category</h1>
                <Grid container spacing = {3} style = {{marginTop: '2%'}}>
                    <Grid item xs = {3}>
                        <ul className = "categories-list">
                        {categories ? 
                        <>
                        <h2>All Categories</h2>
                        {displayCategories()}
                        </> : 
                        
                        'Loading categories...'}
                        <li><a className = "categoryLink" style = {{color: 'red'}} onClick = {() => setSelectedCategory('')}>Clear Selection</a></li>
                        </ul>
                    </Grid>
                    <Grid item xs = {8}>
                        <div className = "selected-category">
                            <p>Selected Cateogry : <b>{selectedCategory ? selectedCategory : 'None'}</b></p>
                        </div>
                        <Grid container spacing = {3} style = {{marginTop: '2%'}}>
                        {stores && categories ? displayStoresAccToCategories() : null}

                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>

    )
    
}

export default BrowseCategory; 
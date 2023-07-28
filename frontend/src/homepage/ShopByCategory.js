import watchesPic from '../images/watches.jpg'
import bandsPic from '../images/bands.jpg'
import braceletsPic from '../images/bracelets.jpg'
import { Link } from 'react-router-dom';

function ShopByCategory() {

    return (
        <div>
            <h2 id='category-heading'>SHOP BY CATEGORY</h2>

            <div id='category-container'>
                <div id="category-list">
                    <Link to='/category/watches' id='link'>
                        <div className="category-item">
                            <img src={watchesPic} alt="Watches" />
                            <h3>WATCHES</h3>
                        </div>
                    </Link>

                    <Link to='/category/bands' id='link'>
                    <div className="category-item">
                        <img src={bandsPic} alt="Bands" />
                        <h3>BANDS</h3>
                    </div>
                    </Link>

                    <Link to='/category/bracelets' id='link'>
                    <div className="category-item">
                        <img src={braceletsPic} alt="Bracelets" />
                        <h3>BRACELETS</h3>
                    </div>
                    </Link>
                </div>

                <p id='seeall-btn'>
                    <Link to="/products">SEE ALL</Link>
                </p>
            </div>

        </div>
    );
}

export default ShopByCategory;

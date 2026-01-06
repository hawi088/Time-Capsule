import "./Home.css"
import {useNavigate} from 'react-router-dom'
function Home(){
    const navigate = useNavigate()
    return(
        
       <div className="home-container">
        <h1 className="title">Tempus Arcanum</h1>
        <h3 className="quote">"Within these shadowed halls, thy secrets shall slumber—
sealed by wax and bound by time, until the appointed hour of awakening."</h3>
<div className="buttons">
    <button className="login" onClick={()=>navigate('/login')}>Login</button>
    <button className='signup' onClick={()=>navigate('/register')}>Sign Up</button>
</div>
        </div>
    )
}
export default Home;

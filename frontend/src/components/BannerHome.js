import '../styles/banner.css'
import logo from '../assets/logo-groupomania.png'

function BannerHome() {
	return (
		<div className='bannerHome'>
			<img src= {logo} alt='Groupomania' className='logo' />
		</div>
	)
}

export default BannerHome

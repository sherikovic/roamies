import searchicon from '../../images/searchicon.png';
import arrowdropdownicon from '../../images/arrowdropdownicon.png';
import bellicon from '../../images/bellicon.png';
import dd_profileicon from '../../images/dd_profileicon.png';
import settingsicon from '../../images/settingsicon.png';
import logouticon from '../../images/logouticon.png';
// TODO profile picture should be retrieved from the DB
import profilepic from '../../images/profilepic.png';

import { useOutsideAlerter } from '../../util/util';

import styles from './MainNavBar.module.css';
import { useRef, useState } from 'react';
import { authUser } from 'util/api';

const TopNavBar: React.FC = () => {
	const [searchPlaceholder, setSearchPlaceholder] =
		useState('Search for events');
	const [filterBtnText, setFilterBtnText] = useState('Find Events');
	const [showFilterMenu, setShowFilterMenu] = useState(false);
	const [showProfileMenu, setShowProfileMenu] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [hideSearchIcon, setHideSearchIcon] = useState(false);
	const [flipArrow, setFlipArrow] = useState(false);
	const filterDDRef = useRef(null);
	const profileDDRef = useRef(null);

	const searchInputOnChange = (e: any) => {
		setSearchText(e.target.value);
		e.target.value !== '' ? setHideSearchIcon(true) : setHideSearchIcon(false);
	};

	const dropdownItemOnClick = (e: any) => {
		setFilterBtnText('Find ' + e.target.innerText);
		setSearchPlaceholder('Search for ' + e.target.innerText);
		setShowFilterMenu(false);
		setFlipArrow(false);
	};

	const filterBtnOnClick = () => {
		setShowFilterMenu(!showFilterMenu);
		setFlipArrow(!flipArrow);
	};

	useOutsideAlerter(filterDDRef, () => {
		setShowFilterMenu(false);
		setFlipArrow(false);
	});

	useOutsideAlerter(profileDDRef, () => {
		setShowProfileMenu(false);
	});

	const logOutHandler = async () => {
		const res = await authUser('logout', null);
		res.status === 200 && window.location.reload();
		// TODO handle errors coming from the logout
	};

	return (
		<div>
			<div className={styles.main_nav_bar}>
				<nav className={styles.main_nav_bar_left}>
					<section className={styles.brand}>
						<a href='/'>SYT</a>
					</section>
					<section className={styles.search_field}>
						<button
							type='button'
							className={styles.filter_search_button}
							onClick={filterBtnOnClick}
							ref={filterDDRef}
						>
							{filterBtnText}
							<img
								src={arrowdropdownicon}
								alt='arrow drop down icon'
								className={
									flipArrow
										? `${styles.icon} ${styles.arrowdropdownicon} ${styles.arrowdropdownflip}`
										: `${styles.icon} ${styles.arrowdropdownicon}`
								}
							/>
							{showFilterMenu && (
								<div className={styles.filter_search_list}>
									<p onClick={dropdownItemOnClick}>Events</p>
									<p onClick={dropdownItemOnClick}>Trips</p>
								</div>
							)}
						</button>
						<label htmlFor='search'>
							<img
								src={searchicon}
								alt='search icon'
								className={
									hideSearchIcon
										? `${styles.icon} ${styles.searchicon} ${styles.hideIcon}`
										: `${styles.icon} ${styles.searchicon}`
								}
							/>
						</label>
						<input
							type='search'
							name='search'
							id='search'
							value={searchText}
							placeholder={searchPlaceholder}
							onChange={searchInputOnChange}
						/>
					</section>
				</nav>
				{/* <section className={styles.nav_items}></section> */}
				<nav>
					<section className={styles.main_nav_bar_right}>
						<div>
							<img
								src={bellicon}
								alt='notifications icon'
								className={styles.bellicon}
							/>
						</div>
						<div ref={profileDDRef}>
							<img
								src={profilepic}
								alt='empty profile'
								className={styles.profilepic}
								onClick={() => setShowProfileMenu(!showProfileMenu)}
							/>
							{showProfileMenu && (
								<div className={styles.profile_menu}>
									<a href='/profile'>
										<img
											src={dd_profileicon}
											alt='profile icon'
											className={styles.icon}
										/>
										Profile
									</a>
									<a href='/settings'>
										<img
											src={settingsicon}
											alt='settigns icon'
											className={styles.icon}
										/>
										Settings
									</a>
									<button type='button' onClick={logOutHandler}>
										<img
											src={logouticon}
											alt='log out icon'
											className={styles.icon}
										/>
										Sign out
									</button>
								</div>
							)}
						</div>
					</section>
				</nav>
			</div>
		</div>
	);
};

export default TopNavBar;

import searchicon from "../../images/searchicon.png";
import arrowdropdownicon from "../../images/arrowdropdownicon.png";
import bellicon from "../../images/bellicon.png";
import dd_profileicon from "../../images/dd_profileicon.png";
import settingsicon from "../../images/settingsicon.png";
import logouticon from "../../images/logouticon.png";
// TODO profile picture should be retrieved from the DB
import profilepic from "../../images/profilepic.png";
import logo from "../../images/logo.svg";

import { clientUrl, useOutsideAlerter } from "../../util/util";

import { useEffect, useRef, useState } from "react";
import { authUser } from "util/api";
import { Link, useRouteLoaderData } from "react-router-dom";
import { LogoBlack, LogoLink } from "util/common_styles";
import styled from "styled-components";

const HomeNavigation: React.FC = () => {
	const [searchPlaceholder, setSearchPlaceholder] =
		useState("Search for Events");
	const [filterBtnText, setFilterBtnText] = useState("Find Events");
	const [showFilterMenu, setShowFilterMenu] = useState(false);
	const [showProfileMenu, setShowProfileMenu] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [hideSearchIcon, setHideSearchIcon] = useState(false);
	const [flipArrow, setFlipArrow] = useState(false);
	const filterDDRef = useRef(null);
	const profileDDRef = useRef(null);
	const [homeUrl, setHomeUrl] = useState("/");

	const searchInputOnChange = (e: any) => {
		setSearchText(e.target.value);
		e.target.value !== "" ? setHideSearchIcon(true) : setHideSearchIcon(false);
	};

	const dropdownItemOnClick = (e: any) => {
		setFilterBtnText("Find " + e.target.innerText);
		setSearchPlaceholder("Search for " + e.target.innerText);
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
		const res = await authUser("logout", null);
		res.status === 200 && window.location.assign(clientUrl);
		// TODO handle errors coming from the logout
	};

	const logIn = useRouteLoaderData("root");
	useEffect(() => {
		logIn && setHomeUrl("home");
		!logIn && setHomeUrl("/");
	}, [logIn]);

	return (
		<HomeNavBar>
			<HomeNavBarSide>
				<LogoLink href={homeUrl}>
					<LogoBlack src={logo} />
				</LogoLink>
				<SearchField>
					<SearchFilterBtn
						type="button"
						onClick={filterBtnOnClick}
						ref={filterDDRef}
					>
						{filterBtnText}
						<DropDownImg
							src={arrowdropdownicon}
							alt="arrow drop down icon"
							$height={18}
							$width={18}
							$top={0}
							$left={10}
							$mr={8}
							$transform={flipArrow ? "scaleY(-1)" : ""}
						/>
						{showFilterMenu && (
							<FilterSearchList>
								<p onClick={dropdownItemOnClick}>Events</p>
								<p onClick={dropdownItemOnClick}>Trips</p>
							</FilterSearchList>
						)}
					</SearchFilterBtn>
					<label htmlFor="search">
						<Img
							src={searchicon}
							alt="search icon"
							$height={18}
							$width={18}
							$top={10}
							$left={540}
							$mr={8}
							style={
								hideSearchIcon ? { display: "none" } : { display: "block" }
							}
						/>
					</label>
					<input
						type="search"
						name="search"
						id="search"
						value={searchText}
						placeholder={searchPlaceholder}
						onChange={searchInputOnChange}
					/>
				</SearchField>
			</HomeNavBarSide>
			<HomeNavBarSide>
				<div>
					<Img
						src={bellicon}
						alt="notifications icon"
						$height={25}
						$width={25}
						$top={0}
						$left={0}
						$mr={20}
						style={{ cursor: "pointer" }}
					/>
				</div>
				<div ref={profileDDRef}>
					<Img
						src={profilepic}
						alt="empty profile"
						$height={40}
						$width={40}
						$top={0}
						$left={0}
						$mr={0}
						style={{ borderRadius: "25px", cursor: "pointer" }}
						onClick={() => setShowProfileMenu(!showProfileMenu)}
					/>
					{showProfileMenu && (
						<ProfileMenu>
							<Link to="/profile">
								<Img
									src={dd_profileicon}
									alt="profile icon"
									$height={18}
									$width={18}
									$top={0}
									$left={0}
									$mr={8}
								/>
								Profile
							</Link>
							<Link to="/settings">
								<Img
									src={settingsicon}
									alt="settings icon"
									$height={18}
									$width={18}
									$top={0}
									$left={0}
									$mr={8}
								/>
								Settings
							</Link>
							<button type="button" onClick={logOutHandler}>
								<Img
									src={logouticon}
									alt="log out icon"
									$height={18}
									$width={18}
									$top={0}
									$left={0}
									$mr={8}
								/>
								Sign out
							</button>
						</ProfileMenu>
					)}
				</div>
			</HomeNavBarSide>
		</HomeNavBar>
	);
};

export default HomeNavigation;

const HomeNavBar = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 5px 55px 5px 55px;
	background-color: white;
	position: relative;
	z-index: 2;
	border-bottom: 1px solid #c2c2d1;
	width: 100%;
`;

const HomeNavBarSide = styled.nav`
	display: flex;
	align-items: center;
`;

const SearchField = styled.section`
	display: flex;
	width: 620px;
	padding-right: 50px;
	margin-left: 20px;
	> label {
		position: absolute;
	}
	> input {
		width: 100%;
		border: 1px solid #c2c2d1;
		border-radius: 0px 25px 25px 0px;
		font-size: 15px;
		padding: 10px;
		&:focus {
			border-color: #9b9bab;
			outline: none;
		}
	}
`;

const SearchFilterBtn = styled.button`
	display: flex;
	align-items: center;
	position: relative;
	background-color: white;
	padding: 5px 10px;
	border-radius: 25px 0px 0px 25px;
	cursor: pointer;
	font-size: 15px;
	width: 30%;
	border: 1px solid #c2c2d1;
	border-right: none;
	font-weight: 550;
`;

const FilterSearchList = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	background-color: white;
	width: 138px;
	text-align: center;
	left: 0;
	top: 43px;
	border-radius: 4px 4px 15px 15px;
	z-index: 2;
	border: 1px solid #c2c2d1;
	box-shadow: 0px 0px 3px #bbb5b5;
	> p {
		display: flex;
		flex-direction: column;
		margin: 0;
		padding: 5px 0px;
		cursor: pointer;
		font-weight: 550;
		color: rgb(126 123 123);
		&:not(:first-child) {
			border-top: 1px solid #c2c2d1;
		}
		&:hover {
			color: black;
		}
	}
`;

const Img = styled.img<{
	$height: number;
	$width: number;
	$top: number;
	$left: number;
	$mr: number;
}>`
	height: ${(p) => p.$height}px;
	width: ${(p) => p.$width}px;
	min-height: ${(p) => p.$height}px;
	min-width: ${(p) => p.$width}px;
	margin-right: ${(p) => p.$mr}px;
	text-indent: 0px;
	position: relative;
	top: ${(p) => p.$top}px;
	left: ${(p) => p.$left}px;
`;

const DropDownImg = styled(Img)<{ $transform: string }>`
	transition: all ease-out 0.2s;
	transform: ${(p) => p.$transform};
`;

const ProfileMenu = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 70px;
	right: 5px;
	width: 140px;
	border: 1px solid #c2c2d1;
	background-color: white;
	box-shadow: 0px 0px 3px #bbb5b5;
	border-radius: 4px;
	z-index: 2;
	> a {
		padding: 5px 0 5px 25px;
		text-align: left;
		text-decoration: none;
		color: rgb(126 123 123);
		font-size: 15px;
		border-top: 1px solid #e8e8f0;
		&:not(:first-child) {
			border-top: 1px solid #e8e8f0;
		}
		&:hover {
			color: black;
		}
	}
	> button {
		border: none;
		padding: 8px 0 8px 25px;
		color: rgb(126 123 123);
		background-color: white;
		font-size: 15px;
		text-align: left;
		border-top: 1px solid #e8e8f0;
		cursor: pointer;
		border-radius: 0px 0px 4px 4px;
		&:hover {
			color: black;
		}
	}
`;

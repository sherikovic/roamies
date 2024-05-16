import { useState } from "react";
import AccountSettingsForm from "./AccountSettingsForm";
import PersonalInfoForm from "./PersonalInfoForm";
import styled from "styled-components/macro";

interface SettingsTabsProps {
	children?: React.ReactNode;
}

const SettingsTabs: React.FC<SettingsTabsProps> = (props) => {
	const [toggleTab, setToggleTab] = useState(1);

	function toggleTabHandler(index: number): void {
		setToggleTab(index);
	}

	return (
		<TabsContainer>
			<BlocTabs>
				<TabIndicator $left={toggleTab === 2 ? 50 : 0} />
				<Tab
					onClick={() => toggleTabHandler(1)}
					$active={toggleTab === 1 ?? false}
				>
					Personal Information
				</Tab>
				<Tab
					onClick={() => toggleTabHandler(2)}
					$active={toggleTab === 2 ?? false}
				>
					Account Settings
				</Tab>
			</BlocTabs>
			<div>
				{toggleTab === 1 && <PersonalInfoForm />}
				{toggleTab === 2 && <AccountSettingsForm />}
			</div>
		</TabsContainer>
	);
};

export default SettingsTabs;

const TabsContainer = styled.div`
	display: flex;
	flex-direction: column;
	border: 0.1rem solid var(--color-gray-700);
	border-radius: 7px;
`;

const BlocTabs = styled.div`
	display: flex;
	flex-direction: row;
	position: relative;
	margin-bottom: 1rem;
`;

const TabIndicator = styled.div<{ $left?: number }>`
	position: absolute;
	width: calc(50%);
	left: calc(${(p) => p.$left ?? 0}%);
	transition: left 350ms ease 0s;
	bottom: 0px;
	&::after {
		content: "";
		display: block;
		width: 120px;
		height: 3px;
		background-color: var(--color-primary-700);
		border-radius: 80px 80px 0px 0px;
		margin: auto;
		position: relative;
	}
`;

const Tab = styled.button<{ $active: boolean }>`
	flex: 1;
	height: 2.5rem;
	min-height: 2.5rem;
	padding: 0;
	font-size: 0.85rem;
	border: none;
	border-right: 0.1rem solid var(--color-gray-700);
	border-bottom: 0.1rem solid var(--color-gray-700);
	background-color: var(--color-gray-900);
	color: ${(p) =>
		p.$active ? "var(--color-primary-500)" : "var(--color-primary-200)"};
	transition: all 300ms ease 0s;
	cursor: pointer;
	border-radius: 7px 0 0 0;
	&:hover {
		background-color: var(--color-gray-800);
	}
	&:last-child {
		border-radius: 0 7px 0 0;
		border-right: none;
	}
`;

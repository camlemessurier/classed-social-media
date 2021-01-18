import { Container } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Posts from "../components/Posts";

export default function Home() {
	return (
		<Container>
			<Tabs>
				<TabList>
					<Tab>Home</Tab>
					<Tab>Login</Tab>
					<Tab>Register</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						<Posts />
					</TabPanel>
					<TabPanel>
						<p>two!</p>
					</TabPanel>
					<TabPanel>
						<p>three!</p>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Container>
	);
}

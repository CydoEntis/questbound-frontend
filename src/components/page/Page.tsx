import { motion } from "framer-motion";

type PageProps = {
	children: React.ReactNode;
};

const Page: React.FC<PageProps> = ({ children }) => {
	return (
		<motion.div
			initial={{ x: "-100%", opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: "100%", opacity: 0 }}
			transition={{ duration: 0.5, ease: "easeInOut" }}
			style={{
				width: "100%",
				minHeight: "calc(100vh - 60px)", 
				height: "100%", 
				position: "relative", 
				backgroundColor: "purple", 
			}}
		>
			{children}
		</motion.div>
	);
};

export default Page;

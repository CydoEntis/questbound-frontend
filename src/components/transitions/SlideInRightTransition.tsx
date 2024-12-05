import { motion } from "framer-motion";

type SlideInRightTransitionProps = {
	children: React.ReactNode;
};

function SlideInRightTransition({ children }: SlideInRightTransitionProps) {
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
			}}
		>
			{children}
		</motion.div>
	);
}

export default SlideInRightTransition;

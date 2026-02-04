import type { Variants, TargetAndTransition } from "framer-motion";

export const staggerContainer: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.2,
		},
	},
};

export const staggerContainerFast: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.1,
		},
	},
};

export const statsContainer: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.8,
		},
	},
};

export const fadeUp: Variants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: [0.25, 0.46, 0.45, 0.94],
		},
	},
};

export const fadeUpSmall: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
			ease: "easeOut",
		},
	},
};

export const fadeUpLarge: Variants = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: [0.25, 0.46, 0.45, 0.94],
		},
	},
};

export const scaleFade: Variants = {
	hidden: { opacity: 0, scale: 0.8 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.4,
			ease: "easeOut",
		},
	},
};

export const scaleFadeSmall: Variants = {
	hidden: { opacity: 0, scale: 0.95 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.5,
			ease: "easeOut",
		},
	},
};

export const popIn: Variants = {
	hidden: { opacity: 0, scale: 0.5, y: 20 },
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: "easeOut",
		},
	},
};

export const cardReveal: Variants = {
	hidden: { opacity: 0, y: 30, scale: 0.95 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.5,
			ease: "easeOut",
		},
	},
};

export const hoverLift: TargetAndTransition = {
	y: -5,
	transition: { duration: 0.2 },
};

export const hoverLiftLarge: TargetAndTransition = {
	y: -6,
	boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
	transition: { duration: 0.3, ease: "easeOut" as const },
};

export const hoverScale: TargetAndTransition = {
	scale: 1.05,
	transition: { duration: 0.2 },
};

export const hoverImageZoom: TargetAndTransition = {
	scale: 1.05,
};

export const transitions = {
	smooth: { duration: 0.3, ease: "easeOut" },
	fast: { duration: 0.2, ease: "easeOut" },
	slow: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
	spring: { type: "spring", stiffness: 300, damping: 30 },
} as const;

export const createDelayedFadeUp = (delay: number): Variants => ({
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: "easeOut",
			delay,
		},
	},
});

export const createStaggerContainer = (
	staggerDelay: number = 0.15,
	initialDelay: number = 0.2,
): Variants => ({
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: staggerDelay,
			delayChildren: initialDelay,
		},
	},
});

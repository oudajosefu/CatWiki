/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'hero-image-sm': "url('/static/HeroImagesm.png')",
				'hero-image-md': "url('/static/HeroImagemd.png')",
				'hero-image-lg': "url('/static/HeroImagelg.png')",
			},
			fontFamily: {
				montserrat: ['Montserrat', 'sans-serif'],
			},
		},
	},
	plugins: [],
};

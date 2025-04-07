const perfilvendedor = {
	id: 'A0072214',
	name: 'Ana Gomez',
	status: 'Active',
	avatar:
		'https://static.vecteezy.com/system/resources/previews/011/615/614/non_2x/student-girl-portrait-at-university-campus-free-photo.jpg',
	products: [
		{
			id: 'prod-1',
			name: 'Salted caramel',
			description: 'Macadamia and chips of white chocolate',
			price: '8.000',
			image:
				'https://grandbaby-cakes.com/wp-content/uploads/2023/04/salted-caramel-chocolate-chip-cookies-recipe-500x375.jpg',
			favorite: false,
			available: true,
		},
		{
			id: 'prod-2',
			name: 'Kinderella',
			description: 'Filled with hazelnut cream',
			price: '8.000',
			image: 'https://jessiebakescakes.com/wp-content/uploads/2024/06/kinder-cookies-recipe-2-min.jpg',
			favorite: false,
			available: true,
		},
		{
			id: 'prod-3',
			name: 'Milo Fudge',
			description: 'Creamy center and melcochudo de milo',
			price: '8.000',
			image: 'https://i0.wp.com/jennyisbaking.com/wp-1c174-content/uploads/2018/07/DSC00782.jpg',
			favorite: true,
			available: true,
		},
		{
			id: 'prod-4',
			name: 'Red velvet',
			description: 'With white chocolate chips',
			price: '8.000',
			image: 'https://www.janespatisserie.com/wp-content/uploads/2020/05/IMG_1062_1-scaled.jpg',
			favorite: false,
			available: false,
		},
	],
	cupones: [
		{
			id: 1,
			titulo: '25% off! Canneli roll',
			autor: 'Maria H.',
		},
		{
			id: 2,
			titulo: '15% off! Airheads',
			autor: 'Lisa S.',
		},
		{
			id: 3,
			titulo: '20% off! Blueberry muffins',
			autor: 'Maria H.',
		},
	],
};

export default perfilvendedor;

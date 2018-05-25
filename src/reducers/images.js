const initialState = {
	images: null,
	userImages: null,
	error: null,
	user: {
		id: 78261,
		name: 'shekhar',
		pic: 'https://cdn.pixabay.com/photo/2015/07/20/12/53/man-852762_1280.jpg',
	}
}

export default function (state = initialState, action) {
	switch(action.type){
		case 'FETCH_IMAGES':
			return Object.assign({}, state, {
				images: [],
				fetchingImages: true,
				error: null
			});
		case 'FETCH_IMAGES_SUCCESS':
			return Object.assign({}, state, {
				images: action.images,
				fetchingImages: false,
				error: null
			});
		case 'FETCH_IMAGES_ERROR':
			return Object.assign({}, state, {
				images: null,
				fetchingImages: false,
				error: action.error
			});
		case 'FETCH_USER_IMAGES':
			return Object.assign({}, state, {
				userImages: [],
				fetchingUserImages: true,
				error: null
			});
		case 'FETCH_USER_IMAGES_SUCCESS':
			return Object.assign({}, state, {
				userImages: action.images,
				fetchingImages: false,
				error: null
			});
		case 'ADD_IMAGE':
			return Object.assign({}, state, {
				addingImage: true,
				error: null
			});
		case 'ADD_IMAGE_SUCCESS':
			let image = {
				id: Math.floor(Math.random() * 99999999),
				src: action.imageSrc,
				user: state.user
			}
			return Object.assign({}, state, {
				addingImage: false,
				images: [image].concat(state.images),
				error: null
			});
		case 'ADD_IMAGE_ERROR':
			return Object.assign({}, state, {
				addingImage: false,
				error: action.error
			});
		default:
			return state;

	}
}

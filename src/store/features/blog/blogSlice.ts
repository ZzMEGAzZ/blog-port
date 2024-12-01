import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Post {
    id: string;
    title: string;
    slug: string;
    content: string;
    published: boolean;
}

interface BlogState {
    posts: Post[];
    selectedPost: Post | null;
    loading: boolean;
    error: string | null;
}

const initialState: BlogState = {
    posts: [],
    selectedPost: null,
    loading: false,
    error: null,
};

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<Post[]>) => {
            state.posts = action.payload;
        },
        setSelectedPost: (state, action: PayloadAction<Post>) => {
            state.selectedPost = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        addPost: (state, action: PayloadAction<Post>) => {
            state.posts.push(action.payload);
        },
        updatePost: (state, action: PayloadAction<Post>) => {
            const index = state.posts.findIndex((post) => post.id === action.payload.id);
            if (index !== -1) {
                state.posts[index] = action.payload;
            }
        },
        deletePost: (state, action: PayloadAction<string>) => {
            state.posts = state.posts.filter((post) => post.id !== action.payload);
        },
    },
});

export const { setPosts, setSelectedPost, setLoading, setError, addPost, updatePost, deletePost } = blogSlice.actions;
export default blogSlice.reducer;

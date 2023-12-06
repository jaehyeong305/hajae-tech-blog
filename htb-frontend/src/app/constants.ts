import { PostTag } from "./components/mainPosts/MainPosts";

export const PostTags: PostTag[] = [
    { tagName: 'All', isActive: true },
    { tagName: 'React.js', isActive: false },
    { tagName: 'Next.js', isActive: false },
    { tagName: 'TypeScript', isActive: false },
    { tagName: 'FrontEnd', isActive: false },
    { tagName: 'BackEnd', isActive: false },
    { tagName: 'Infra', isActive: false },
    { tagName: 'Network', isActive: false },
    { tagName: 'Other', isActive: false },
]

type PostItem = {
    postId: string,
    postTitle: string,
    postBody: string,
    postMainImage: string,
    createdBy: string,
    createdAt: Date,
    postTags: string[],
    comments: Comment[],
}

type Comment = {
    message: string,
    commentedBy: string,
    commentedAt: Date,
}

export const TempPostsLeft: PostItem[] = [
    {
        postId: '1',
        postTitle: 'Next.js 그래서 왜씀?',
        postBody: '안녕하세요 하재형입니다. 왜냐면 HTML 랜더링을 잘해서 씁니다. 이하생략',
        postMainImage: '/images/main-bgi1.jpg',
        createdBy: 'jaehyeong.ha',
        createdAt: new Date(2023, 3, 5),
        postTags: ['Next.js', 'React.js'],
        comments: []
    },
    {
        postId: '2',
        postTitle: 'REST API란?',
        postBody: '로이 필딩이 논문에서 제시한 웹 아키텍처 스타일 "REST"의 원칙을 엄격하게 준수하여 설계된 API !',
        postMainImage: '/images/main-bgi2.jpg',
        createdBy: 'jaehyeong.ha',
        createdAt: new Date(2023, 1, 2),
        postTags: ['Other'],
        comments: []
    }
]

export const TempPostsRight: PostItem[] = [
    {
        postId: '1',
        postTitle: 'Hello World!',
        postBody: '안녕하세요 하재형입니다. 준비중.....',
        postMainImage: '/images/main-bgi5.jpg',
        createdBy: 'jaehyeong.ha',
        createdAt: new Date(2023, 3, 5),
        postTags: ['TypeScript'],
        comments: []
    },
    {
        postId: '2',
        postTitle: '준비중....ㅠㅠ',
        postBody: '준비중입니다.....',
        postMainImage: '/images/main-bgi3.jpg',
        createdBy: 'jaehyeong.ha',
        createdAt: new Date(2023, 1, 2),
        postTags: ['Other'],
        comments: []
    }
]
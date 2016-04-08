import { createConstantsType } from 'utils'

// load
export const POSTS_LOAD = createConstantsType('POSTS_LOAD')

// create
export const POST_CREATE = createConstantsType('POSTS_CREATE')

// page
export const NEXT_PAGE_LOAD = createConstantsType('NEXT_PAGE_LOAD')

export const PREV_PAGE_LOAD = createConstantsType('PREV_PAGE_LOAD')

export const LIKE_POST = createConstantsType('POST_LIKES')

export const UNLIKE_POST = createConstantsType('POSTS_UNLIKE')

export const DOWN_POST = createConstantsType('POSTS_DOWN')

export const UNDOWN_POST = createConstantsType('POSTS_UNDOWN')

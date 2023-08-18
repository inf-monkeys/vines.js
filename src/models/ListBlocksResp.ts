/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BlockDto } from './BlockDto';

export type ListBlocksResp = {
    /**
     * 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。
     */
    code: number;
    /**
     * 描述信息
     */
    message: string;
    /**
     * Blocks 列表
     */
    data: Array<BlockDto>;
};

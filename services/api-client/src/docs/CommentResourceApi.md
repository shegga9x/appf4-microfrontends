# CommentResourceApi

All URIs are relative to */services/commentlike*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**countByParentIdAndParentType1**](#countbyparentidandparenttype1) | **GET** /api/comments/countByParentIdAndParentType | |
|[**countCommentsParentIdsAndParentType**](#countcommentsparentidsandparenttype) | **GET** /api/comments/countCommentsParentIdsAndParentType | |
|[**createComment**](#createcomment) | **POST** /api/comments | |
|[**deleteComment**](#deletecomment) | **DELETE** /api/comments/{id} | |
|[**getAllComments**](#getallcomments) | **GET** /api/comments | |
|[**getComment**](#getcomment) | **GET** /api/comments/{id} | |
|[**getCommentsByParent**](#getcommentsbyparent) | **GET** /api/comments/by-parent | |
|[**partialUpdateComment**](#partialupdatecomment) | **PATCH** /api/comments/{id} | |
|[**updateComment**](#updatecomment) | **PUT** /api/comments/{id} | |

# **countByParentIdAndParentType1**
> number countByParentIdAndParentType1()


### Example

```typescript
import {
    CommentResourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CommentResourceApi(configuration);

let parentId: string; // (default to undefined)
let parentType: string; // (default to undefined)

const { status, data } = await apiInstance.countByParentIdAndParentType1(
    parentId,
    parentType
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **parentId** | [**string**] |  | defaults to undefined|
| **parentType** | [**string**] |  | defaults to undefined|


### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **countCommentsParentIdsAndParentType**
> Array<number> countCommentsParentIdsAndParentType()


### Example

```typescript
import {
    CommentResourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CommentResourceApi(configuration);

let parentIds: Array<string>; // (default to undefined)
let parentType: string; // (default to undefined)

const { status, data } = await apiInstance.countCommentsParentIdsAndParentType(
    parentIds,
    parentType
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **parentIds** | **Array&lt;string&gt;** |  | defaults to undefined|
| **parentType** | [**string**] |  | defaults to undefined|


### Return type

**Array<number>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createComment**
> CommentDTO createComment(commentDTO)


### Example

```typescript
import {
    CommentResourceApi,
    Configuration,
    CommentDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new CommentResourceApi(configuration);

let commentDTO: CommentDTO; //

const { status, data } = await apiInstance.createComment(
    commentDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **commentDTO** | **CommentDTO**|  | |


### Return type

**CommentDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteComment**
> deleteComment()


### Example

```typescript
import {
    CommentResourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CommentResourceApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.deleteComment(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAllComments**
> Array<CommentDTO> getAllComments()


### Example

```typescript
import {
    CommentResourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CommentResourceApi(configuration);

let page: number; //Zero-based page index (0..N) (optional) (default to 0)
let size: number; //The size of the page to be returned (optional) (default to 20)
let sort: Array<string>; //Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. (optional) (default to undefined)

const { status, data } = await apiInstance.getAllComments(
    page,
    size,
    sort
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] | Zero-based page index (0..N) | (optional) defaults to 0|
| **size** | [**number**] | The size of the page to be returned | (optional) defaults to 20|
| **sort** | **Array&lt;string&gt;** | Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. | (optional) defaults to undefined|


### Return type

**Array<CommentDTO>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getComment**
> CommentDTO getComment()


### Example

```typescript
import {
    CommentResourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CommentResourceApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.getComment(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**CommentDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getCommentsByParent**
> Array<CommentWithRedisUserDTO> getCommentsByParent()


### Example

```typescript
import {
    CommentResourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CommentResourceApi(configuration);

let parentId: string; // (default to undefined)
let parentType: string; // (default to undefined)
let page: number; //Zero-based page index (0..N) (optional) (default to 0)
let size: number; //The size of the page to be returned (optional) (default to 20)
let sort: Array<string>; //Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. (optional) (default to undefined)

const { status, data } = await apiInstance.getCommentsByParent(
    parentId,
    parentType,
    page,
    size,
    sort
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **parentId** | [**string**] |  | defaults to undefined|
| **parentType** | [**string**] |  | defaults to undefined|
| **page** | [**number**] | Zero-based page index (0..N) | (optional) defaults to 0|
| **size** | [**number**] | The size of the page to be returned | (optional) defaults to 20|
| **sort** | **Array&lt;string&gt;** | Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. | (optional) defaults to undefined|


### Return type

**Array<CommentWithRedisUserDTO>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **partialUpdateComment**
> CommentDTO partialUpdateComment(commentDTO)


### Example

```typescript
import {
    CommentResourceApi,
    Configuration,
    CommentDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new CommentResourceApi(configuration);

let id: string; // (default to undefined)
let commentDTO: CommentDTO; //

const { status, data } = await apiInstance.partialUpdateComment(
    id,
    commentDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **commentDTO** | **CommentDTO**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**CommentDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/merge-patch+json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateComment**
> CommentDTO updateComment(commentDTO)


### Example

```typescript
import {
    CommentResourceApi,
    Configuration,
    CommentDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new CommentResourceApi(configuration);

let id: string; // (default to undefined)
let commentDTO: CommentDTO; //

const { status, data } = await apiInstance.updateComment(
    id,
    commentDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **commentDTO** | **CommentDTO**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**CommentDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


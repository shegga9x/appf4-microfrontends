# LikeResourceApi

All URIs are relative to */services/commentlike*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**checkLikeExists**](#checklikeexists) | **GET** /api/likes/exists | |
|[**countByParentIdAndParentType**](#countbyparentidandparenttype) | **GET** /api/likes/countByParentIdAndParentType | |
|[**countLikesParentIdsAndParentType**](#countlikesparentidsandparenttype) | **GET** /api/likes/countLikesParentIdsAndParentType | |
|[**createLike**](#createlike) | **POST** /api/likes | |
|[**deleteLike**](#deletelike) | **DELETE** /api/likes/{id} | |
|[**deleteLikeByParentIdAndUserId**](#deletelikebyparentidanduserid) | **DELETE** /api/likes/by-parent-and-user | |
|[**getAllLikes**](#getalllikes) | **GET** /api/likes | |
|[**getLike**](#getlike) | **GET** /api/likes/{id} | |
|[**getLikesByParent**](#getlikesbyparent) | **GET** /api/likes/by-parent | |
|[**partialUpdateLike**](#partialupdatelike) | **PATCH** /api/likes/{id} | |
|[**updateLike**](#updatelike) | **PUT** /api/likes/{id} | |

# **checkLikeExists**
> boolean checkLikeExists()


### Example

```typescript
import {
    LikeResourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LikeResourceApi(configuration);

let parentId: string; // (default to undefined)
let userId: string; // (default to undefined)

const { status, data } = await apiInstance.checkLikeExists(
    parentId,
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **parentId** | [**string**] |  | defaults to undefined|
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**boolean**

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

# **countByParentIdAndParentType**
> number countByParentIdAndParentType()


### Example

```typescript
import {
    LikeResourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LikeResourceApi(configuration);

let parentId: string; // (default to undefined)
let parentType: string; // (default to undefined)

const { status, data } = await apiInstance.countByParentIdAndParentType(
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

# **countLikesParentIdsAndParentType**
> Array<number> countLikesParentIdsAndParentType()


### Example

```typescript
import {
    LikeResourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LikeResourceApi(configuration);

let parentIds: Array<string>; // (default to undefined)
let parentType: string; // (default to undefined)

const { status, data } = await apiInstance.countLikesParentIdsAndParentType(
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

# **createLike**
> LikeDTO createLike(likeDTO)


### Example

```typescript
import {
    LikeResourceApi,
    Configuration,
    LikeDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new LikeResourceApi(configuration);

let likeDTO: LikeDTO; //

const { status, data } = await apiInstance.createLike(
    likeDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **likeDTO** | **LikeDTO**|  | |


### Return type

**LikeDTO**

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

# **deleteLike**
> deleteLike()


### Example

```typescript
import {
    LikeResourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LikeResourceApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.deleteLike(
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

# **deleteLikeByParentIdAndUserId**
> deleteLikeByParentIdAndUserId()


### Example

```typescript
import {
    LikeResourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LikeResourceApi(configuration);

let parentId: string; // (default to undefined)
let userId: string; // (default to undefined)

const { status, data } = await apiInstance.deleteLikeByParentIdAndUserId(
    parentId,
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **parentId** | [**string**] |  | defaults to undefined|
| **userId** | [**string**] |  | defaults to undefined|


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

# **getAllLikes**
> Array<LikeDTO> getAllLikes()


### Example

```typescript
import {
    LikeResourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LikeResourceApi(configuration);

let page: number; //Zero-based page index (0..N) (optional) (default to 0)
let size: number; //The size of the page to be returned (optional) (default to 20)
let sort: Array<string>; //Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. (optional) (default to undefined)

const { status, data } = await apiInstance.getAllLikes(
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

**Array<LikeDTO>**

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

# **getLike**
> LikeDTO getLike()


### Example

```typescript
import {
    LikeResourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LikeResourceApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.getLike(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**LikeDTO**

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

# **getLikesByParent**
> Array<LikeWithRedisUserDTO> getLikesByParent()


### Example

```typescript
import {
    LikeResourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LikeResourceApi(configuration);

let parentId: string; // (default to undefined)
let parentType: string; // (default to undefined)
let page: number; //Zero-based page index (0..N) (optional) (default to 0)
let size: number; //The size of the page to be returned (optional) (default to 20)
let sort: Array<string>; //Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. (optional) (default to undefined)

const { status, data } = await apiInstance.getLikesByParent(
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

**Array<LikeWithRedisUserDTO>**

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

# **partialUpdateLike**
> LikeDTO partialUpdateLike(likeDTO)


### Example

```typescript
import {
    LikeResourceApi,
    Configuration,
    LikeDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new LikeResourceApi(configuration);

let id: string; // (default to undefined)
let likeDTO: LikeDTO; //

const { status, data } = await apiInstance.partialUpdateLike(
    id,
    likeDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **likeDTO** | **LikeDTO**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**LikeDTO**

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

# **updateLike**
> LikeDTO updateLike(likeDTO)


### Example

```typescript
import {
    LikeResourceApi,
    Configuration,
    LikeDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new LikeResourceApi(configuration);

let id: string; // (default to undefined)
let likeDTO: LikeDTO; //

const { status, data } = await apiInstance.updateLike(
    id,
    likeDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **likeDTO** | **LikeDTO**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**LikeDTO**

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


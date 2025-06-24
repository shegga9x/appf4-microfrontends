# UserResourceApi

All URIs are relative to */services/msfeed*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createUser**](#createuser) | **POST** /api/users | |
|[**deleteUser**](#deleteuser) | **DELETE** /api/users/{id} | |
|[**getAllUsers**](#getallusers) | **GET** /api/users | |
|[**getUser**](#getuser) | **GET** /api/users/{id} | |
|[**partialUpdateUser**](#partialupdateuser) | **PATCH** /api/users/{id} | |
|[**updateUser**](#updateuser) | **PUT** /api/users/{id} | |

# **createUser**
> UserDTO createUser(userDTO)


### Example

```typescript
import {
    UserResourceApi,
    Configuration,
    UserDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new UserResourceApi(configuration);

let userDTO: UserDTO; //

const { status, data } = await apiInstance.createUser(
    userDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userDTO** | **UserDTO**|  | |


### Return type

**UserDTO**

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

# **deleteUser**
> deleteUser()


### Example

```typescript
import {
    UserResourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserResourceApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.deleteUser(
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

# **getAllUsers**
> Array<UserDTO> getAllUsers()


### Example

```typescript
import {
    UserResourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserResourceApi(configuration);

let page: number; //Zero-based page index (0..N) (optional) (default to 0)
let size: number; //The size of the page to be returned (optional) (default to 20)
let sort: Array<string>; //Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. (optional) (default to undefined)

const { status, data } = await apiInstance.getAllUsers(
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

**Array<UserDTO>**

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

# **getUser**
> UserDTO getUser()


### Example

```typescript
import {
    UserResourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserResourceApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.getUser(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**UserDTO**

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

# **partialUpdateUser**
> UserDTO partialUpdateUser(userDTO)


### Example

```typescript
import {
    UserResourceApi,
    Configuration,
    UserDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new UserResourceApi(configuration);

let id: string; // (default to undefined)
let userDTO: UserDTO; //

const { status, data } = await apiInstance.partialUpdateUser(
    id,
    userDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userDTO** | **UserDTO**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**UserDTO**

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

# **updateUser**
> UserDTO updateUser(userDTO)


### Example

```typescript
import {
    UserResourceApi,
    Configuration,
    UserDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new UserResourceApi(configuration);

let id: string; // (default to undefined)
let userDTO: UserDTO; //

const { status, data } = await apiInstance.updateUser(
    id,
    userDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userDTO** | **UserDTO**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**UserDTO**

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


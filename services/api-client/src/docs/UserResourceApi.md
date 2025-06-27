# UserResourceApi

All URIs are relative to */services/feed*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createUser**](#createuser) | **POST** /api/users | |
|[**deleteUser**](#deleteuser) | **DELETE** /api/users/{id} | |
|[**getAllUsers**](#getallusers) | **GET** /api/users | |
|[**getUser**](#getuser) | **GET** /api/users/{id} | |
|[**getUserFromRedis**](#getuserfromredis) | **GET** /api/users/{id}/redis | |
|[**getUsersFromRedis**](#getusersfromredis) | **GET** /api/users/redis/{ids} | |
|[**getUsersFromRedisPost**](#getusersfromredispost) | **POST** /api/users/redis | |
|[**partialUpdateUser**](#partialupdateuser) | **PATCH** /api/users/{id} | |
|[**syncUsersToRedis**](#syncuserstoredis) | **POST** /api/users/sync-to-redis | |
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

const { status, data } = await apiInstance.getAllUsers();
```

### Parameters
This endpoint does not have any parameters.


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

# **getUserFromRedis**
> RedisUserDTO getUserFromRedis()


### Example

```typescript
import {
    UserResourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserResourceApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.getUserFromRedis(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**RedisUserDTO**

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

# **getUsersFromRedis**
> Array<RedisUserDTO> getUsersFromRedis()


### Example

```typescript
import {
    UserResourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserResourceApi(configuration);

let ids: string; // (default to undefined)

const { status, data } = await apiInstance.getUsersFromRedis(
    ids
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ids** | [**string**] |  | defaults to undefined|


### Return type

**Array<RedisUserDTO>**

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

# **getUsersFromRedisPost**
> Array<RedisUserDTO> getUsersFromRedisPost(requestBody)


### Example

```typescript
import {
    UserResourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserResourceApi(configuration);

let requestBody: Array<string>; //

const { status, data } = await apiInstance.getUsersFromRedisPost(
    requestBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **requestBody** | **Array<string>**|  | |


### Return type

**Array<RedisUserDTO>**

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

# **syncUsersToRedis**
> { [key: string]: object; } syncUsersToRedis()


### Example

```typescript
import {
    UserResourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserResourceApi(configuration);

const { status, data } = await apiInstance.syncUsersToRedis();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**{ [key: string]: object; }**

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


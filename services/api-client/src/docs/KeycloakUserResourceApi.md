# KeycloakUserResourceApi

All URIs are relative to */services/commentlike*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createKeycloakUser**](#createkeycloakuser) | **POST** /api/keycloak-users | |
|[**deleteKeycloakUser**](#deletekeycloakuser) | **DELETE** /api/keycloak-users/{id} | |
|[**getAllKeycloakUsers**](#getallkeycloakusers) | **GET** /api/keycloak-users | |
|[**getKeycloakUser**](#getkeycloakuser) | **GET** /api/keycloak-users/{id} | |
|[**partialUpdateKeycloakUser**](#partialupdatekeycloakuser) | **PATCH** /api/keycloak-users/{id} | |
|[**updateKeycloakUser**](#updatekeycloakuser) | **PUT** /api/keycloak-users/{id} | |

# **createKeycloakUser**
> KeycloakUserDTO createKeycloakUser(keycloakUserDTO)


### Example

```typescript
import {
    KeycloakUserResourceApi,
    Configuration,
    KeycloakUserDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new KeycloakUserResourceApi(configuration);

let keycloakUserDTO: KeycloakUserDTO; //

const { status, data } = await apiInstance.createKeycloakUser(
    keycloakUserDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **keycloakUserDTO** | **KeycloakUserDTO**|  | |


### Return type

**KeycloakUserDTO**

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

# **deleteKeycloakUser**
> deleteKeycloakUser()


### Example

```typescript
import {
    KeycloakUserResourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new KeycloakUserResourceApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.deleteKeycloakUser(
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

# **getAllKeycloakUsers**
> Array<KeycloakUserDTO> getAllKeycloakUsers()


### Example

```typescript
import {
    KeycloakUserResourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new KeycloakUserResourceApi(configuration);

const { status, data } = await apiInstance.getAllKeycloakUsers();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<KeycloakUserDTO>**

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

# **getKeycloakUser**
> KeycloakUserDTO getKeycloakUser()


### Example

```typescript
import {
    KeycloakUserResourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new KeycloakUserResourceApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.getKeycloakUser(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**KeycloakUserDTO**

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

# **partialUpdateKeycloakUser**
> KeycloakUserDTO partialUpdateKeycloakUser(keycloakUserDTO)


### Example

```typescript
import {
    KeycloakUserResourceApi,
    Configuration,
    KeycloakUserDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new KeycloakUserResourceApi(configuration);

let id: string; // (default to undefined)
let keycloakUserDTO: KeycloakUserDTO; //

const { status, data } = await apiInstance.partialUpdateKeycloakUser(
    id,
    keycloakUserDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **keycloakUserDTO** | **KeycloakUserDTO**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**KeycloakUserDTO**

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

# **updateKeycloakUser**
> KeycloakUserDTO updateKeycloakUser(keycloakUserDTO)


### Example

```typescript
import {
    KeycloakUserResourceApi,
    Configuration,
    KeycloakUserDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new KeycloakUserResourceApi(configuration);

let id: string; // (default to undefined)
let keycloakUserDTO: KeycloakUserDTO; //

const { status, data } = await apiInstance.updateKeycloakUser(
    id,
    keycloakUserDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **keycloakUserDTO** | **KeycloakUserDTO**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**KeycloakUserDTO**

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


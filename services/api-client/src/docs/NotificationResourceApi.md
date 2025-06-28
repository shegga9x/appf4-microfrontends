# NotificationResourceApi

All URIs are relative to */services/commentlike*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createNotification**](#createnotification) | **POST** /api/notifications | |
|[**deleteNotification**](#deletenotification) | **DELETE** /api/notifications/{id} | |
|[**getAllNotifications**](#getallnotifications) | **GET** /api/notifications | |
|[**getNotification**](#getnotification) | **GET** /api/notifications/{id} | |
|[**partialUpdateNotification**](#partialupdatenotification) | **PATCH** /api/notifications/{id} | |
|[**updateNotification**](#updatenotification) | **PUT** /api/notifications/{id} | |

# **createNotification**
> NotificationDTO createNotification(notificationDTO)


### Example

```typescript
import {
    NotificationResourceApi,
    Configuration,
    NotificationDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationResourceApi(configuration);

let notificationDTO: NotificationDTO; //

const { status, data } = await apiInstance.createNotification(
    notificationDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **notificationDTO** | **NotificationDTO**|  | |


### Return type

**NotificationDTO**

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

# **deleteNotification**
> deleteNotification()


### Example

```typescript
import {
    NotificationResourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationResourceApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.deleteNotification(
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

# **getAllNotifications**
> Array<NotificationDTO> getAllNotifications()


### Example

```typescript
import {
    NotificationResourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationResourceApi(configuration);

let page: number; //Zero-based page index (0..N) (optional) (default to 0)
let size: number; //The size of the page to be returned (optional) (default to 20)
let sort: Array<string>; //Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. (optional) (default to undefined)

const { status, data } = await apiInstance.getAllNotifications(
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

**Array<NotificationDTO>**

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

# **getNotification**
> NotificationDTO getNotification()


### Example

```typescript
import {
    NotificationResourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationResourceApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.getNotification(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**NotificationDTO**

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

# **partialUpdateNotification**
> NotificationDTO partialUpdateNotification(notificationDTO)


### Example

```typescript
import {
    NotificationResourceApi,
    Configuration,
    NotificationDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationResourceApi(configuration);

let id: string; // (default to undefined)
let notificationDTO: NotificationDTO; //

const { status, data } = await apiInstance.partialUpdateNotification(
    id,
    notificationDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **notificationDTO** | **NotificationDTO**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**NotificationDTO**

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

# **updateNotification**
> NotificationDTO updateNotification(notificationDTO)


### Example

```typescript
import {
    NotificationResourceApi,
    Configuration,
    NotificationDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationResourceApi(configuration);

let id: string; // (default to undefined)
let notificationDTO: NotificationDTO; //

const { status, data } = await apiInstance.updateNotification(
    id,
    notificationDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **notificationDTO** | **NotificationDTO**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**NotificationDTO**

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


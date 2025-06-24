# PexelsControllerApi

All URIs are relative to */services/msfeed*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**downloadAndStoreImage**](#downloadandstoreimage) | **POST** /api/pexels/download | |
|[**downloadAndStoreVideo**](#downloadandstorevideo) | **POST** /api/pexels/videos/download | |
|[**searchImages**](#searchimages) | **GET** /api/pexels/search | |
|[**searchVideos**](#searchvideos) | **GET** /api/pexels/videos/search | |
|[**storePexelsImage**](#storepexelsimage) | **POST** /api/pexels/store | |
|[**storePexelsVideo**](#storepexelsvideo) | **POST** /api/pexels/videos/store | |
|[**uploadImage**](#uploadimage) | **POST** /api/pexels/upload | |
|[**uploadVideo**](#uploadvideo) | **POST** /api/pexels/videos/upload | |

# **downloadAndStoreImage**
> string downloadAndStoreImage()


### Example

```typescript
import {
    PexelsControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PexelsControllerApi(configuration);

let imageUrl: string; // (default to undefined)

const { status, data } = await apiInstance.downloadAndStoreImage(
    imageUrl
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **imageUrl** | [**string**] |  | defaults to undefined|


### Return type

**string**

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

# **downloadAndStoreVideo**
> string downloadAndStoreVideo()


### Example

```typescript
import {
    PexelsControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PexelsControllerApi(configuration);

let videoUrl: string; // (default to undefined)

const { status, data } = await apiInstance.downloadAndStoreVideo(
    videoUrl
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **videoUrl** | [**string**] |  | defaults to undefined|


### Return type

**string**

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

# **searchImages**
> Array<string> searchImages()


### Example

```typescript
import {
    PexelsControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PexelsControllerApi(configuration);

let query: string; // (default to undefined)
let perPage: number; // (optional) (default to 10)

const { status, data } = await apiInstance.searchImages(
    query,
    perPage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **query** | [**string**] |  | defaults to undefined|
| **perPage** | [**number**] |  | (optional) defaults to 10|


### Return type

**Array<string>**

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

# **searchVideos**
> Array<{ [key: string]: object; }> searchVideos()


### Example

```typescript
import {
    PexelsControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PexelsControllerApi(configuration);

let query: string; // (default to undefined)
let perPage: number; // (optional) (default to 10)

const { status, data } = await apiInstance.searchVideos(
    query,
    perPage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **query** | [**string**] |  | defaults to undefined|
| **perPage** | [**number**] |  | (optional) defaults to 10|


### Return type

**Array<{ [key: string]: object; }>**

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

# **storePexelsImage**
> string storePexelsImage()


### Example

```typescript
import {
    PexelsControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PexelsControllerApi(configuration);

let pexelsImageUrl: string; // (default to undefined)

const { status, data } = await apiInstance.storePexelsImage(
    pexelsImageUrl
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **pexelsImageUrl** | [**string**] |  | defaults to undefined|


### Return type

**string**

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

# **storePexelsVideo**
> string storePexelsVideo()


### Example

```typescript
import {
    PexelsControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PexelsControllerApi(configuration);

let pexelsVideoUrl: string; // (default to undefined)

const { status, data } = await apiInstance.storePexelsVideo(
    pexelsVideoUrl
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **pexelsVideoUrl** | [**string**] |  | defaults to undefined|


### Return type

**string**

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

# **uploadImage**
> string uploadImage()


### Example

```typescript
import {
    PexelsControllerApi,
    Configuration,
    UploadVideoRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new PexelsControllerApi(configuration);

let uploadVideoRequest: UploadVideoRequest; // (optional)

const { status, data } = await apiInstance.uploadImage(
    uploadVideoRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **uploadVideoRequest** | **UploadVideoRequest**|  | |


### Return type

**string**

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

# **uploadVideo**
> string uploadVideo()


### Example

```typescript
import {
    PexelsControllerApi,
    Configuration,
    UploadVideoRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new PexelsControllerApi(configuration);

let uploadVideoRequest: UploadVideoRequest; // (optional)

const { status, data } = await apiInstance.uploadVideo(
    uploadVideoRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **uploadVideoRequest** | **UploadVideoRequest**|  | |


### Return type

**string**

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


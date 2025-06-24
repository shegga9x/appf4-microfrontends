# MsNotificationKafkaResourceApi

All URIs are relative to */services/msfeed*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**sendReelDirectly**](#sendreeldirectly) | **POST** /api/kafka-test/send-reel-direct | |

# **sendReelDirectly**
> string sendReelDirectly(reelRequest)


### Example

```typescript
import {
    MsNotificationKafkaResourceApi,
    Configuration,
    ReelRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new MsNotificationKafkaResourceApi(configuration);

let reelRequest: ReelRequest; //

const { status, data } = await apiInstance.sendReelDirectly(
    reelRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reelRequest** | **ReelRequest**|  | |


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


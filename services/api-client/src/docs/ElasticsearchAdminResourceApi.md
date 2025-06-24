# ElasticsearchAdminResourceApi

All URIs are relative to */services/msfeed*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**reindexReels**](#reindexreels) | **POST** /api/admin/elasticsearch/reindex/reels | |

# **reindexReels**
> reindexReels()


### Example

```typescript
import {
    ElasticsearchAdminResourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ElasticsearchAdminResourceApi(configuration);

const { status, data } = await apiInstance.reindexReels();
```

### Parameters
This endpoint does not have any parameters.


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


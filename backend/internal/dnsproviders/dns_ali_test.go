package dnsproviders

import (
	"npm/internal/util"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestAliProvider(t *testing.T) {
	provider := getDNSAli()
	json, err := provider.GetJsonSchema()
	assert.Nil(t, err)
	assert.Equal(t, `{
  "title": "dns_ali",
  "type": "object",
  "additionalProperties": false,
  "required": [
    "Ali_Key",
    "Ali_Secret"
  ],
  "properties": {
    "Ali_Key": {
      "title": "api-key",
      "type": "string",
      "additionalProperties": false,
      "minLength": 1
    },
    "Ali_Secret": {
      "title": "secret",
      "type": "string",
      "additionalProperties": false,
      "minLength": 1
    }
  }
}`, util.PrettyPrintJSON(json))
}

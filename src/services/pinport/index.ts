import { PinportClient } from "@pinport/client";
import { PinportMapportExtension } from "@pinport/mapport";

// {
// 	"id": "4b0c3da1-01da-4b38-844f-3746298a651b",
// 	"private_key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoicHJpdmF0ZSIsInVpZCI6IjRiMGMzZGExLTAxZGEtNGIzOC04NDRmLTM3NDYyOThhNjUxYiIsImlhdCI6MTcyMTMxODY0N30.4s9rnQtCYZ7vsjxuzBiaxsoMGUfRWo7pKoR0vp58-No",
// 	"public_key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoicHVibGljIiwidWlkIjoiNGIwYzNkYTEtMDFkYS00YjM4LTg0NGYtMzc0NjI5OGE2NTFiIiwiaWF0IjoxNzIxMzE4NjQ3fQ.B6_lRiWKKgBlRSG9HqpNT0m7qbeqyXR7ezFL-dWEjCY"
// }

export const pinport = new PinportClient(
  "https://localhost:3000",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  {
    extensions: [PinportMapportExtension],
  }
);




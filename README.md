# pts-lambda-example2

AWS Lambda example 2

# build

`lambda.yml.example` を複製して `lambda.yml` を作成し、lambda function の設定を記述してください。

以下のコマンドを実行することで、env で指定した環境の lambda function が自動で作成・更新されます。

```command-line
gulp build
```

# API Gateway の設定

1. API Gateway の画面で API を作成します。
2. Resource `/{proxy+}` を追加します。
3. Resource `/{proxy+}` に Method `ANY` を追加します。
  - Integration type で Lambda Function Proxy を選択します。
  - Lambda Region で ap-northeast-1 を選択します。
  - Lambda Function で pts-lambda-example2 を選択します。
4. プルダウンメニューから Deploy API を選択します。
5. 新規に Stage を作成し deploy します。
6. 生成された base url に `/users` を付けてアクセスしてみます。

# lambda.yml の Role について

lambda 実行用の IAM Role は事前に awscli もしくは管理コンソールで作成しておき、その ARN を指定します。

IAM Role を作るには、

```json:AssumeRolePolicy.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

上記 AssumeRolePolicy.json を用意して

```command-line
$ aws iam create-role \
  --role-name {LAMBDA_ROLE_NAME} \
  --assume-role-policy-document file://AssumeRolePolicy.json
```

で role を作成します。

```command-line
$ aws iam attach-role-policy \
  --role-name {LAMBDA_ROLE_NAME} \
  --policy-arn arn:aws:iam::aws:policy/AWSLambdaExecute
```

で作成した role に管理ポリシーの AWSLambdaExecute を付与しておきます。
Role ARN は、

```command-line
$ aws iam get-role \
  --role-name {LAMBDA_ROLE_NAME} \
  --query Role.Arn \
  --output text
```

で確認できます。

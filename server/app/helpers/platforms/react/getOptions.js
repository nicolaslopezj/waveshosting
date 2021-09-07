export default async function() {
  return [
    {
      Namespace: 'aws:elasticbeanstalk:container:nodejs',
      OptionName: 'NodeVersion',
      Value: '8.15.0'
    },
    {
      Namespace: 'aws:elasticbeanstalk:container:nodejs',
      OptionName: 'ProxyServer',
      Value: 'none'
    }
  ]
}
